import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.get('monthcards/:cardId', async ({ params }) => {
    return HttpResponse.json([
      {
        userId: '67b39dae13026fd988907e92',
        year: 2024,
        month: 4,
        totalIncome: 1600,
        fixedItems: [
          {
            description: 'Phone',
            amount: 9.99,
          },
          {
            description: 'rent+bills+food',
            amount: 605,
          },
          {
            description: 'Pole Dance',
            amount: 158,
          },
        ],
        subscriptionItems: [
          {
            description: 'Amazon photos',
            amount: 1.99,
          },
          {
            description: 'Amazon Ads',
            amount: 1.99,
          },
          {
            description: 'HBO',
            amount: 4.99,
          },
        ],
        otherItems: [
          {
            description: 'Brunch in Madrid',
            amount: 12,
            category: '67a91f012213777227c723cb',
          },
          {
            description: 'Vicens turrones',
            amount: 16,
            category: '67a91f012213777227c723cb',
          },
          {
            description: 'Calvin Klein',
            amount: 49,
            category: '67a91f012213777227c723cb',
          },
          {
            description: 'Decathlon',
            amount: 76,
            category: '67a91f012213777227c723cb',
          },
          {
            description: 'Cena Liberty',
            amount: 30,
            category: '67a91f012213777227c723cb',
          },
        ],
        transportItems: [
          {
            description: 'cabify',
            amount: 6.98,
            category: '67a91f012213777227c723cb',
          },
        ],
      },
    ]);
  }),

  http.get('/users/:userId/cards', async ({ params }) => {
    return HttpResponse.json([
      {
        cardId: '67b39f575ee98cc48c17cec5',
        month: 'March',
      },
      {
        cardId: '67b39f9c8e5bc6f868faf427',
        month: 'May',
      },
    ]);
  }),

  http.get('http://localhost:3030/categories', async () => {
    return HttpResponse.json([
      {
        name: 'Unexpected expense',
        description:
          'Unexpected expenses like vet, medicine, replacement, etc.',
      },
      {
        name: 'Guilty pleasure expense',
        description:
          'Spontaneous or unnecessary purchases like snacks, takeout or something not 100% necessary.',
      },
      { name: 'Gifts', description: 'A gift or present for someone else' },
    ]);
  }),

  http.post('http://localhost:3030/auth/signup', async (req) => {
    await delay(400);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return HttpResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (email === 'placeholder') {
      return HttpResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    return HttpResponse.json(
      { message: 'Account created succesfully' },
      { status: 201 }
    );
  }),

  http.post('http://localhost:3030/auth/signin', async (req) => {
    await delay(400);

    const { email, password } = req.body;

    if (!email || !password) {
      return HttpResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (email === 'placeholder' && password === 'placeholderpassword') {
      return HttpResponse.json({ token: '9827542384' }, { status: 200  });
    } else {
      return HttpResponse.json(
        { error: 'Incorrect password' },
        { status: 401  }
      );
    }
  }),

  http.post('http://localhost:3030/monthcards/new', async () => {
    await delay(400);

    return HttpResponse.json(
      { cardId: '67b39f9c8e5bc6f868faf427' },
      { status: 201 }
    );
  }),

  http.patch('monthcards/update/:cardId', async ({ params }) => {
    await delay(400);

    return HttpResponse.json(
      { message: `Card ${params.cardId} updated` },
      { status: 201 }
    );
  }),

  http.patch('/users/:userId/update', async ({ params }) => {
    await delay(400);

    return HttpResponse.json(
      { message: `User ${params.userId} updated` },
      { status: 201 }
    );
  }),
];
