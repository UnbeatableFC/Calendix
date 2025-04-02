import nextAppSession from 'next-app-session';

// Your session data type
type MySessionData = {
   grantId? : string
   email? : string
}

// Setup the config for your session and cookie
export const session = nextAppSession<MySessionData>({
   // Options
   name: 'Calendix_Session',
   secret: process.env.SECRET ,
   
});