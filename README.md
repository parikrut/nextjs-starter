# Starter Guide for NextJS
- Nextjs Version 14.X
- Tailwind
- Shadcn
- Next auth version 5.x

## Overview
- As Next is server first fullstack framework
- All react components are server components unless you define it to be client
- All Client interation can only be done in "use client" components such as. onClick, onChange etc..
- All database queries should be made only under "use server" components 

## Coding patterns
#### As we follow nextjs product should be made with server first approach
- API
    - Server components that has interaction with database Should created under `/server` with naming `x.api.tsx`
    - All Api's should follow same pattern like this `/server/user.api.ts`
- Forms
    - Forms should have validation on client side, Using React Hook form and Zod
    - All forms should be under `/components/forms` with naming `x.form.tsx`
    - Form should use similar style as used in `/components/forms/register.form.tsx`
- Fetching 
    - Fetching of list should be done on server component 
    - All list must have pagination follow this `/components/lists/user.list.tsx`
    - List can be made of Card, table or any custom component but must be under `components/lists` with naming `components/lists/x.list.tsx`
    - Fetching must have loading state with skeleton layout. That can be done using Suspense, Refer this `/app/dashboard/page.tsx`
- Client Actions
    - Any type of button triggers should be seperated from server component
    - All client component should be under `/client`
    - Take this as an example `/client/verifyUser.tsx`
    - Try to use this client action as less as possible in general it should be under only for Button triggers

## Folder structure
- `app` 
    - `api` used for api routes like {URL}/api/example
    - `layout.tsx` loaded first and you can define layouts
    - `page.tsx` loaded after layout.tsx mainly used to fetch data
    - `(folder)` Route group can be created using this statergy and layout can be reused [Refer-this](https://nextjs.org/docs/app/building-your-application/routing/route-groups#convention)
    - `[id]`all dynamic path can be configured like this
- `client`
    - Contains all client component which has "use client" directive 
- `component`
    - `cards` All resuable cards should be here with Skeleton state; <b>Must be Server components</b>
    = `dialogs` All Dialog for servercomponents should be here; <b>Must be Server components</b>
    - `forms` All forms through out the application should be here; Must be Client components
    - `lists` All bulk data should be here with Skeleton state; <b>Must be Server components</b>
    - `sections` All pages should be break down into smaller chunks and sections should be place where chunks should be 
    kept
    - `ui` resuable small components should be kept here like Button, Card etc...
- `context` 
    - All react context and provider should be here
- `emails`
    - All email template should be under this folder
    - follow `/emails/reset-password.tsx` for reference
- `lib`
    - All config files, routes and helper functions should be here
- `server`
    - All server apis that require database interaction should be here
    - DO NOT CALL database directly in pages or any other component it should be wrapped under server folder
- `types`
    - All custom types should be under this folder with naming `x.d.ts`

## Switch Database
- Change `prisma/schema.prisma` provider
- Change `.env` file



Create a search field that gives ASYNC result
comma seperated search with input