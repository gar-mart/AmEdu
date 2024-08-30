function Restart-Setup {
	Write-Host "Please run this setup script again as the session's PATH needs to be updated." -ForegroundColor DarkYellow
	pause
	exit
}

function Install-Net6 {
	Write-Host "Installing .NET 6..." -ForegroundColor Cyan

	if (Get-Command 'dotnet' -errorAction SilentlyContinue) 
	{
		# some version of dotnet exists, we can continue
	}
	else 
	{
		Write-Host "No version of dotnet exists."
		winget install --id=Microsoft.DotNet.SDK.6  -e
		Restart-Setup
	}

	if (dotnet --list-sdks | findstr 6.0)
	{	
		Write-Host ".NET 6 SDK is already installed."
	}
	else 
	{
		winget install --id=Microsoft.DotNet.SDK.6  -e
	}
}

function Install-Nvm {
	Write-Host "Installing NVM for Windows..." -ForegroundColor Cyan

	if (Get-Command 'nvm' -errorAction SilentlyContinue) 
	{
		Write-Host "NVM for Windows is already installed."
	}
	elseif (Get-Command 'npm' -errorAction SilentlyContinue) 
	{
		Write-Host "You must uninstall Node.JS in order to run this setup script. We use NVM to easily manage our Node versions." -ForegroundColor Red
		pause 
		exit
	}
	else
	{
		winget install --id=CoreyButler.NVMforWindows -e
		Restart-Setup
	}
}

function Install-NodeJs {
	$version = '16.13.0'
	Write-Host "Installing Node.JS v$($version)" -ForegroundColor Cyan

	if (nvm list | findstr $version) 
	{
		Write-Host "Node.JS v$($version) is already installed."
	}
	else
	{
		nvm install $version
	}

	if (Get-Command 'node' -errorAction SilentlyContinue)
	{
		$nodeVersion = node -v
		if ($nodeVersion -eq "v$($version)")
		{
			Write-Host "Node.JS v$($version) is already the active version."
		}
		else
		{
			nvm use $version
		}
	} 
	else 
	{
		Restart-Setup
	}
}

function Install-NpmPackages {
	$baseDirectory = Get-Location
	Write-Host "Installing NPM Packages" -ForegroundColor Cyan

	if (Get-Command 'npm' -errorAction SilentlyContinue)
	{
		$packageFiles = Get-ChildItem -Path .\* -Filter "package.json" -Recurse -ErrorAction SilentlyContinue -Force | Where {$_.FullName -notlike "*\node_modules\*"} | Where {$_.FullName -notlike "*\obj\*"} | Where {$_.FullName -notlike "*\bin\*"}
		foreach ($file in $packageFiles)
		{
			Write-Host "running npm install inside $($file.Directory)"
			cd $file.Directory
			npm i
		}
		cd $baseDirectory
	}
	else
	{
		cd $baseDirectory
		Restart-Setup
	}
}

Install-Net6
Install-Nvm
Install-NodeJs
Install-NpmPackages

Write-Host "Successfully completed environment setup."
pause