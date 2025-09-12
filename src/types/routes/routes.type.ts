export type AppRoute = {
  path: string;
  element: React.ReactNode;
  roles?: string[];
};

export const ROUTES = {
  PUBLIC: {
    home: "/",
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
  },
  PRIVATE: {
    dashboard: "/dashboard",
    categories: "/dashboard/categories",
    subcategories: "/dashboard/categories/:categoryId/subcategories/name/:name",
    organizeradmin: "/dashboard/organizer-admin",
    organizerdetailadmin: "/dashboard/organizer-admin/:id",
    conference: "/dashboard/conference",
    Conferenceroom: "/dashboard/conferences/:id/conference-room/:name",
    recordingsadmin: "/dashboard/recordings-admin",
    recordingsadminorganizer:
      "/dashboard/recordings-admin/:recordingId/recordings-organizer/name/:name",
    recordingorganizer: "/dashboard/recordings-organizer",
    resourcesrecording: "/dashboard/recordings-organizer/:recordingId/resources",
    recordingContent: "/dashboard/recordings-organizer/:recordingId/content",

    recordingadmin: "/dashboard/recordings-admin",
    resourcesadminrecording: "/dashboard/recordings-admin/:recordingId/resources",
    recordingadminContent: "/dashboard/recordings-admin/:recordingId/content",

    support: "/dashboard/support",
    privacy: "/dashboard/privacy",
    terms: "/dashboard/terms",
    profile: "/dashboard/profile",
  },
} as const;

export type PublicRouteKey = keyof typeof ROUTES.PUBLIC;
export type PrivateRouteKey = keyof typeof ROUTES.PRIVATE;
