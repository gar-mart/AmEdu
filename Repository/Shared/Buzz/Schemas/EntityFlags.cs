using System;

namespace Shared.Buzz.Schemas;

[Flags]
public enum EntityFlags
{
    None = 0x00,
    Deleted = 0x01,
    Deactivated = 0x02,
};
