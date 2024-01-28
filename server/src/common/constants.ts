export const minRequiredPasswordLength = 8;
export const passwordHashRounds = 12;
export const tokenHashRounds = 10;

export const jwtCookieConstants = {
  accessTokenName: 'access-token',
  refreshTokenName: 'refresh-token',
};

export const databaseConstants = {
  user: {
    name: 'User',
    virtualFields: {
      cardsPath: 'cards',
    },
  },
};
