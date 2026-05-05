export const GET_QUESTION = `
  query {
    randomQuestion {
      label
    }
  }
`;

export const GET_ROUND = `
  query {
    randomRound {
      countries {
        flag_url
        country
        label
        value
        
      }
      question {
        column_key
        label
        unit
      }
    }
  }
`;