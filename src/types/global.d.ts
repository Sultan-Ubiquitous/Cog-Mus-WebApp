export {}

// Create a type for the roles
export type Groups = 'intervention' | 'non-intervention'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      group?: Groups
    }
  }
}