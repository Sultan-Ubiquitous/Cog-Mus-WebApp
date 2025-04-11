export {}

// Create a type for the roles
export type Groups = 'intervention' | 'non-intervention'
export type FirstSignIn = boolean;

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      group?: Groups
      firstSignIn?: FirstSignIn
      role?: Roles
    }
  }
}