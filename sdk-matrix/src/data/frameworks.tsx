import { Framework } from "@/types"
import { DotnetIcon, ExpressIcon, NestIcon, NextIcon } from '@/components/framework-icons';

/* ***** .NET ***** */
const dotnetFramework: Framework = {
  id: 'dotnet',
  name: '.NET',
  icon: (selected) => <DotnetIcon selected={selected} />,
  samples: {
    login: {
      name: 'Login Endpoint',
      language: 'csharp',
      code: `using Microsoft.AspNetCore.Http;
using Wristband.AspNet.Auth;

public static class AuthRoutes
{
    public static WebApplication MapAuthEndpoints(this WebApplication app)
    {
        // Login Endpoint - Route path can be whatever you prefer
        app.MapGet("/auth/login", async (
            HttpContext context,
            IWristbandAuthService wristbandAuth) =>
        {
            // Call the Wristband Login() method and redirect to the resulting URL.
            var wristbandAuthorizeUrl = await wristbandAuth.Login(context, null);
            return Results.Redirect(wristbandAuthorizeUrl);
        });

        // ...other endpoints here...
    }
}`,
    },
    callback: {
      name: 'Callback Endpoint',
      language: 'go',
      code: `using Microsoft.AspNetCore.Http;
using Wristband.AspNet.Auth;

// Callback Endpoint - Route path can be whatever you prefer
app.MapGet("/auth/callback", async (
    HttpContext httpContext,
    IWristbandAuthService wristbandAuth) =>
{
    // Call the Wristband Callback() method to get results, token data, and user info.
    var callbackResult = await wristbandAuth.Callback(httpContext);

    // ...save session data...
    await httpContext.SignInAsync(
        CookieAuthenticationDefaults.AuthenticationScheme, 
        new ClaimsPrincipal(identity), 
        new AuthenticationProperties { IsPersistent = true });

    // Send the user back to the application.
    var tenantDomain = callbackResult.CallbackData.TenantDomainName;
    return Results.Redirect($"https://{tenantDomain}.example.com");      
});`,
    },
    logout: {
      name: 'Logout Endpoint',
      language: 'go',
      code: `using Microsoft.AspNetCore.Http;
using Wristband.AspNet.Auth;

// Logout Endpoint - Route path can be whatever you prefer
app.MapGet("/auth/logout", async (
    HttpContext httpContext,
    IWristbandAuthService wristbandAuth) =>
{
    // Get session data
    var RefreshToken = SessionHelper.GetClaim(httpContext, "refreshToken");
    var TenantDomainName = SessionHelper.GetClaim(httpContext, "tenantDomainName");

    // Destroy your application session.
    await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

    // Call the Wristband Logout() method and redirect to the resulting URL.
    const logoutConfig = new LogoutConfig { RefreshToken, TenantDomainName }
    var wristbandLogoutUrl = await wristbandAuth.Logout(httpContext, logoutConfig);
    return Results.Redirect(wristbandLogoutUrl);
});`,
    },
  },
}

/* ***** Express ***** */
const expressFramework: Framework = {
  id: 'express',
  name: 'Node.js',
  icon: (selected) => <ExpressIcon selected={selected} />,
  samples: {
    login: {
      name: 'Login Endpoint',
      language: 'javascript',
      code: `import express from 'express';
import { wristbandAuth } from './wristband-auth.ts';

const app = express();

// Login Endpoint - Route path can be whatever you prefer
app.get('/auth/login', async (req, res) => {
  // Call the Wristband login() function to redirect to Wristband's Authorize URL.
  await wristbandAuth.login(req, res);
});

// ...other endpoints here...

export default app;`,
    },
    callback: {
      name: 'Callback Endpoint',
      language: 'javascript',
      code: `import type { CallbackResultType } from '@wristband/express-auth';
import { wristbandAuth } from './wristband-auth.ts';

// Callback Endpoint - Route path can be whatever you prefer
app.get('/auth/callback', async (req, res) => {
  // Call the Wristband callback() function to get results, token data, and user info.
  const callbackResult = await wristbandAuth.callback(req, res);
  const { callbackData } = callbackResult;

  // ...save session data...
  await req.session.save();

  // Send the user back to the application.
  res.redirect(\`https://\${callbackData.tenantDomainName}.example.com\`);
});`,
    },
    logout: {
      name: 'Logout Endpoint',
      language: 'javascript',
      code: `import { wristbandAuth } from './wristband-auth.ts';

// Logout Endpoint - Route path can be whatever you prefer
app.get('/auth/logout', async (req, res) => {
  // Get session data
  const { refreshToken, tenantDomainName } = req.session;

  // Destroy your application session.
  req.session.destroy();

  // Call the Wristband logout() function to redirect to Wristband's Logout URL.
  await wristbandAuth.logout(req, res, { tenantDomainName, refreshToken });
});`,
    },
  },
}

/* ***** NestJS ***** */
const nestJsFramework: Framework = {
  id: 'nest',
  name: 'NestJS',
  icon: (selected) => <NestIcon selected={selected} />,
  samples: {
    login: {
      name: 'Login Endpoint',
      language: 'typescript',
      code: `import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WristbandExpressAuthService } from '@wristband/nestjs-auth';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    @Inject('WristbandAuthService')
    private readonly wristbandAuth: WristbandExpressAuthService,
  ) {}

  // Login Endpoint - Route path can be whatever you prefer
  @Get('login')
  async login(@Req() req: Request, @Res() res: Response) {
    // Call the Wristband login() function to redirect to Wristband's Authorize URL.
    return await this.wristbandAuth.login(req, res);
  }

  // ...other endpoints here...
}`,
    },
    callback: {
      name: 'Callback Endpoint',
      language: 'typescript',
      code: `import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CallbackResult, WristbandExpressAuthService } from '@wristband/nestjs-auth';

@Controller('api/v1/auth')
export class AuthController {
  // Callback Endpoint - Route path can be whatever you prefer
  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    // Call the Wristband callback() function to get results, token data, and user info.
    const callbackResult: CallbackResult = await this.wristbandAuthService.callback(req, res);
    const { callbackData } = callbackResult;

    // ...save session data...
    await req.session.save();

    // Send the user back to the application.
    return res.redirect(\`https://\${callbackData.tenantDomainName}.example.com\`);
  }
}`,
    },
    logout: {
      name: 'Logout Endpoint',
      language: 'typescript',
      code: `import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WristbandExpressAuthService, } from '@wristband/nestjs-auth';

@Controller('api/v1/auth')
export class AuthController {
  // Logout Endpoint - Route path can be whatever you prefer
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // Get session data
    const { refreshToken, tenantDomainName } = req.session;

    // Destroy your application session.
    req.session.destroy();

    // Call the Wristband logout() function to redirect to Wristband's Logout URL.
    return await this.wristbandAuth.logout(req, res, { refreshToken, tenantDomainName });
  }
}`,
    },
  },
}

/* ***** NextJS ***** */
const nextJsFramework: Framework = {
  id: 'next',
  name: 'Next.js',
  icon: (selected) => <NextIcon selected={selected} />,
  samples: {
    login: {
      name: 'Login Endpoint',
      language: 'typescript',
      code: `// app/api/auth/login/route.ts - Route path can be whatever you prefer
import type { NextRequest } from 'next/server';
import wristbandAuth from '@/wristband-auth.ts';

// Login Endpoint
export async function GET(req: NextRequest) {
  // Call the Wristband login() function to redirect to Wristband's Authorize URL.
  return await wristbandAuth.appRouter.login(req);
}`,
    },
    callback: {
      name: 'Callback Endpoint',
      language: 'typescript',
      code: `// app/api/auth/callback/route.ts - Route path can be whatever you prefer
import { NextRequest, NextResponse } from 'next/server';
import { CallbackResultType } from '@wristband/nextjs-auth';
import wristbandAuth from '@/wristband-auth.ts';

// Callback Endpoint
export async function GET(req: NextRequest) {
  // Call the Wristband callback() function to get results, token data, and user info.
  const callbackResult = await wristbandAuth.appRouter.callback(req);
  const { callbackData } = callbackResult;
  const session = await getSession();

  // ...save session data...
  await session.save();

  // Send the user back to the application.
  const appUrl = \`https://\${callbackData.tenantDomainName}.example.com\`;
  return wristbandAuth.appRouter.createCallbackResponse(req, appUrl);
}`,
    },
    logout: {
      name: 'Logout Endpoint',
      language: 'typescript',
      code: `// app/api/auth/logout/route.ts - Route path can be whatever you prefer
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import wristbandAuth from '@/wristband-auth';

// Logout Endpoint
export async function GET(req: NextRequest) {
  // Get session data
  const session = await getSession();
  const { refreshToken, tenantDomainName } = session;

  // Destroy your application session.
  session.destroy();

  // Call the Wristband logout() function to redirect to Wristband's Logout URL.
  return await wristbandAuth.appRouter.logout(req, { refreshToken, tenantDomainName });
});`,
    },
  },
};

// Exports
export const frameworks: Framework[] = [nextJsFramework, expressFramework, nestJsFramework, dotnetFramework];
