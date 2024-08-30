using System;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Repository.Repositories.Security.Groups;

namespace Repository.Repositories.Security.Users;

public sealed class ApplicationDbContext: IdentityDbContext<ApplicationIdentityUser, RoleModel, Guid>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        _ = builder.HasDefaultSchema("Security");
        IdentityModelCreating<ApplicationIdentityUser, RoleModel, Guid, IdentityUserClaim<Guid>, IdentityUserRole<Guid>, IdentityUserLogin<Guid>, IdentityRoleClaim<Guid>, IdentityUserToken<Guid>>(builder);
    }

    private void IdentityModelCreating<TUser, TRole, TKey, TUserClaim, TUserRole, TUserLogin, TRoleClaim, TUserToken>(ModelBuilder builder)
        where TUser : IdentityUser<TKey>
        where TRole : IdentityRole<TKey>
        where TKey : IEquatable<TKey>
        where TUserClaim : IdentityUserClaim<TKey>
        where TUserRole : IdentityUserRole<TKey>
        where TUserLogin : IdentityUserLogin<TKey>
        where TRoleClaim : IdentityRoleClaim<TKey>
        where TUserToken : IdentityUserToken<TKey>
    {
        IdentityUserContext<TUser, TKey, TUserClaim, TUserLogin, TUserToken>(builder);

        _ = builder.Entity<TUser>(b =>
        {
            _ = b.ToTable(schema: "Common", name: "Users").Property(p => p.Id).HasColumnName("IdentityId");
            //_ = b.HasMany<TUserRole>().WithOne().HasForeignKey(ur => ur.UserId).IsRequired().HasPrincipalKey("IdentityId");
        });

        _ = builder.Entity<TRole>(b =>
        {
            _ = b.HasKey(r => r.Id);
            _ = b.HasIndex(r => r.NormalizedName).HasDatabaseName("RoleNameIndex").IsUnique();
            _ = b.ToTable("AspNetRoles");
            _ = b.Property(r => r.ConcurrencyStamp).IsConcurrencyToken();

            _ = b.Property(u => u.Name).HasMaxLength(256);
            _ = b.Property(u => u.NormalizedName).HasMaxLength(256);

            _ = b.HasMany<TUserRole>().WithOne().HasForeignKey(ur => ur.RoleId).IsRequired();
            _ = b.HasMany<TRoleClaim>().WithOne().HasForeignKey(rc => rc.RoleId).IsRequired();
        });

        _ = builder.Entity<TRoleClaim>(b =>
        {
            _ = b.HasKey(rc => rc.Id);
            _ = b.ToTable("AspNetRoleClaims");
        });

        _ = builder.Entity<TUserRole>(b =>
        {
            _ = b.HasKey(r => new { r.UserId, r.RoleId });
            _ = b.ToTable("AspNetUserRoles");
        });
    }

    private void IdentityUserContext<TUser, TKey, TUserClaim, TUserLogin, TUserToken>(ModelBuilder builder)
        where TUser : IdentityUser<TKey>
        where TKey : IEquatable<TKey>
        where TUserClaim : IdentityUserClaim<TKey>
        where TUserLogin : IdentityUserLogin<TKey>
        where TUserToken : IdentityUserToken<TKey>
    {
        _ = builder.Entity<TUser>(b =>
        {
            _ = b.HasKey(u => u.Id);
            _ = b.HasIndex(u => u.NormalizedUserName).HasDatabaseName("UserNameIndex").IsUnique();
            _ = b.HasIndex(u => u.NormalizedEmail).HasDatabaseName("EmailIndex");
            _ = b.ToTable("AspNetUsers");
            _ = b.Property(u => u.ConcurrencyStamp).IsConcurrencyToken();

            _ = b.Property(u => u.UserName).HasMaxLength(256);
            _ = b.Property(u => u.NormalizedUserName).HasMaxLength(256);
            _ = b.Property(u => u.Email).HasMaxLength(256);
            _ = b.Property(u => u.NormalizedEmail).HasMaxLength(256);

            _ = b.HasMany<TUserClaim>().WithOne().HasForeignKey(uc => uc.UserId).IsRequired();
            _ = b.HasMany<TUserLogin>().WithOne().HasForeignKey(ul => ul.UserId).IsRequired();
            _ = b.HasMany<TUserToken>().WithOne().HasForeignKey(ut => ut.UserId).IsRequired();
        });

        _ = builder.Entity<TUserClaim>(b =>
        {
            _ = b.HasKey(uc => uc.Id);
            _ = b.ToTable("AspNetUserClaims");
        });

        _ = builder.Entity<TUserLogin>(b =>
        {
            _ = b.HasKey(l => new { l.LoginProvider, l.ProviderKey });
            _ = b.ToTable("AspNetUserLogins");
        });

        _ = builder.Entity<TUserToken>(b =>
        {
            _ = b.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
            _ = b.ToTable("AspNetUserTokens");
        });
    }
}
