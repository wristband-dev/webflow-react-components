// Export components
export { CodeFrame } from './code-frame';
import React from 'react';
import { Box } from '@mui/material';
import aspNetLogo from 'public/img/asp-net.png';
import nodeJsLogo from 'public/img/node-js.svg';
import nestJsLogo from 'public/img/nestjs-icon.svg';
import nextJsLogo from 'public/img/nextjs-icon.svg';
import type { Framework } from './code-frame';

// Optional: Add a demo/test component
import { CodeFrame } from './code-frame';

const NextIcon = () => (
    <Box
      component="img"
      src={nextJsLogo}
      sx={{
        width: 32,
        height: 32,
        backgroundColor: 'white',
        borderRadius: '4px',
        padding: '4px',
      }}
    />
  );
  
  const NestIcon = () => (
    <Box
      component="img"
      src={nestJsLogo}
      sx={{
        width: 32,
        height: 32,
      }}
    />
  );
  
  const DotNetIcon = () => (
    <Box
      component="img"
      src={aspNetLogo}
      sx={{
        width: 32,
        height: 32,
      }}
    />
  );
  
  const NodeIcon = () => (
    <Box
      component="img"
      src={nodeJsLogo}
      sx={{
        width: 32,
        height: 32,
      }}
    />
  );
  
  export const frameworks: Framework[] = [
    {
      id: 'next',
      name: 'Next.js',
      icon: <NextIcon />,
      samples: {
        login: {
          name: 'Login Endpoint',
          language: 'typescript',
          code: `import type { NextRequest } from 'next/server';
  import wristbandAuth from '@/wristband-auth.ts';
  
  export async function GET(req: NextRequest) {
    return await wristbandAuth.appRouter.login(req);
  }`,
        },
        callback: {
          name: 'Callback Endpoint',
          language: 'typescript',
          code: `import { NextRequest, NextResponse } from 'next/server';
  import { CallbackResultType } from '@wristband/nextjs-auth';
  import wristbandAuth from '@/wristband-auth.ts';
  
  export async function GET(req: NextRequest) {
    const callbackResult = await wristbandAuth.appRouter.callback(req);
    const { callbackData, redirectResponse, result } = callbackResult;
  
    // Send the user back to the application.
    const appUrl = callbackData.returnUrl;
    return wristbandAuth.appRouter.createCallbackResponse(req, appUrl);
  }`,
        },
        logout: {
          name: 'Logout Endpoint',
          language: 'typescript',
          code: `import type { NextRequest } from 'next/server';
  import { cookies } from 'next/headers';
  import wristbandAuth from '@/wristband-auth';
  
  export async function GET(req: NextRequest) {
    //...get session data
    const { refreshToken, tenantCustomDomain, tenantDomainName } = session;
  
    // Always destroy session.
    cookies().delete('my-session-cookie-name');
    session.destroy();
  
    return await wristbandAuth.appRouter.logout(req, { refreshToken, tenantCustomDomain, tenantDomainName });
  });`,
        },
      },
    },
    {
      id: 'express',
      name: 'Node.js',
      icon: <NodeIcon />,
      samples: {
        login: {
          name: 'Login Endpoint',
          language: 'javascript',
          code: `import { wristbandAuth } from './wristband-auth.js';
  
  // Login Endpoint - Route path can be whatever you prefer
  app.get('/auth/login', async (req, res) => {
      await wristbandAuth.login(req, res, { /* Optional login configs */ });
  });`,
        },
        callback: {
          name: 'Callback Endpoint',
          language: 'javascript',
          code: `import type { CallbackResultType } from '@wristband/express-auth';
  import { wristbandAuth } from './wristband-auth.js';
  
  // Callback Endpoint - Route path can be whatever you prefer
  app.get('/auth/callback', async (req, res) => {
      const callbackResult = await wristbandAuth.callback(req, res);
      const { callbackData, result } = callbackResult;
  
      //...save session data
  
      // Send the user back to the application.
      res.redirect(callbackData.returnUrl);
  });`,
        },
        logout: {
          name: 'Logout Endpoint',
          language: 'javascript',
          code: `import { wristbandAuth } from './wristband-auth.js';
  
  // Logout Endpoint - Route path can be whatever you prefer
  app.get('/auth/logout', async (req, res) => {
    //...get session data
    const { refreshToken, tenantDomainName } = session;
  
    // Always destroy your application's session.
    res.clearCookie('my-session-cookie-name');
    req.session.destroy();
    
    await wristbandAuth.logout(req, res, { tenantDomainName, refreshToken });
  });`,
        },
      },
    },
    {
      id: 'nest',
      name: 'NestJS',
      icon: <NestIcon />,
      samples: {
        login: {
          name: 'Login Endpoint',
          language: 'typescript',
          code: `import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
  import { env } from 'node:process';
  import { Request, Response } from 'express';
  import { CallbackResult, CallbackResultType, WristbandExpressAuthService } from '@wristband/nestjs-auth';
  
  @Controller('api/v1/auth')
  export class AuthController {
    @Get('login')
    async login(@Req() req: Request, @Res() res: Response) {
      return await this.wristbandAuth.login(req, res, , { /* Optional login configs */ });
    }
  }`,
        },
        callback: {
          name: 'Callback Endpoint',
          language: 'typescript',
          code: `import { Request, Response } from 'express';
  import { CallbackResult, CallbackResultType, WristbandExpressAuthService, } from '@wristband/nestjs-auth';
    
  // Add the Callback Endpoint 
  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response) {
      const callbackResult: CallbackResult = await this.wristbandAuthService.callback(req, res);
      const { result, callbackData } = callbackResult;
  
      //...save session data
  
      // Send the user back to the application.
      return res.redirect(callbackData.returnUrl);
  }`,
        },
        logout: {
          name: 'Logout Endpoint',
          language: 'typescript',
          code: `import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { CallbackResult, CallbackResultType, WristbandExpressAuthService, } from '@wristband/nestjs-auth';
  
  // Add the Logout Endpoint 
  @Get('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
    //...get session data
    const { refreshToken, tenantDomainName } = session;
  
    res.clearCookie('your_session_cookie_name');
    session.destroy();
  
    return await this.wristbandAuth.logout(req, res, { /* optional logout config */});
  }`,
        },
      },
    },
    {
      id: 'dotnet',
      name: '.NET',
      icon: <DotNetIcon />,
      samples: {
        login: {
          name: 'Login Endpoint',
          language: 'go',
          code: `using Microsoft.AspNetCore.Http;
  using Wristband.AspNet.Auth;
  
  // Login Endpoint - Route path can be whatever you prefer
  app.MapGet("/auth/login", async (HttpContext httpContext, IWristbandAuthService wristbandAuth) => {
    // Call the Wristband Login() method and redirect to the resulting URL.
    var wristbandAuthorizeUrl = await wristbandAuth.Login(httpContext, null);
    return Results.Redirect(wristbandAuthorizeUrl);
  })`,
        },
        callback: {
          name: 'Callback Endpoint',
          language: 'go',
          code: `using Microsoft.AspNetCore.Http;
  using Wristband.AspNet.Auth;
  
  // Callback Endpoint - Route path can be whatever you prefer
  app.MapGet("/auth/callback", async (HttpContext httpContext, IWristbandAuthService wristbandAuth) => {
    // Call the Wristband Callback() method to get results, token data, and user info.
    var callbackResult = await wristbandAuth.Callback(httpContext);
  
    //...save session data        
  
    // For the happy path, send users into your desired app URL!
    var tenantPostLoginRedirectUrl = $"http://{callbackResult.CallbackData.TenantDomainName}.example.com";
    return Results.Redirect(tenantPostLoginRedirectUrl);      
  });`,
        },
        logout: {
          name: 'Logout Endpoint',
          language: 'go',
          code: `using Microsoft.AspNetCore.Http;
  using Wristband.AspNet.Auth;
  
  // Logout Endpoint - Route path can be whatever you prefer
  app.MapGet("/auth/logout", async (HttpContext httpContext, IWristbandAuthService wristbandAuth) => {
    //...fetch session data
        
    // Destroy your application session.
    await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
  
    // Call the Wristband Logout() method and redirect to the resulting URL.
    var wristbandLogoutUrl = await wristbandAuth.Logout(httpContext, new LogoutConfig
      {
        RefreshToken = refreshToken ?? null,
        TenantCustomDomain = tenantCustomDomain ?? null,
        TenantDomainName = tenantDomainName ?? null,
       });
       return Results.Redirect(wristbandLogoutUrl);
  }`,
        },
      },
    },
  ]; 

export const CodeFrameDemo: React.FC = () => {
  return (
    <Box sx={{ 
      width: '100%', 
      height: '400px', // Adjust height as needed
      maxWidth: '1000px', // Optional: limit max width
      margin: '0 auto', // Optional: center in page
    }}>
      <CodeFrame frameworks={frameworks} />
    </Box>
  );
};
