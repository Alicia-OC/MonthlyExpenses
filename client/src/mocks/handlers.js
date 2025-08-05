import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.get('http://localhost:3000/categories', async (req) => {
    const { userId, token } = req.body;

    if (!userId || !token || !params.cardId) {
      return HttpResponse.json(
        { error: 'Missing token or userId' },
        { status: 400 }
      );
    }

    if (params.userId !== 'placeholderId' || token !== 'placeholderToken') {
      return HttpResponse.json({ error: 'Invalid credentials' });
    }
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

  http.post('http://localhost:3000/auth/signup', async (req) => {
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

  http.post('http://localhost:3000/auth/signin', async (req) => {
    await delay(400);

    const { email, password } = req.body;

    if (!email || !password) {
      return HttpResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json(
        {
          token: '9827542384',
          user: { name: 'JaneDoe', email: 'test@example.com', image: '' },
          id: 'd98ds2a7w948',
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }
  }),

  http.post('http://localhost:3000/auth/logout', async (req) => {
    await delay(400);

    const { userid, token } = req.body;

    if (!userid || !token) {
      return HttpResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (userid === 'idExample' && token === 'token') {
      return HttpResponse.json(
        {
          token: '9827542384',
          user: { name: 'JaneDoe', email: 'test@example.com' },
          id: 'd98ds2a7w948',
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }
  }),

  http.post('http://localhost:3000/:userId/:cardId', async (req) => {
    await delay(400);

    const { userId, token } = req.body;

    if (!userId || !token) {
      return HttpResponse.json({ error: 'Missing info' }, { status: 400 });
    }

    if (params.userId !== 'placeholderId' || token !== 'placeholderToken') {
      return HttpResponse.json({ error: 'Invalid credentials' });
    }

    const {
      year,
      month,
      totalExpenses,
      totalIncome,
      totalSavings,
      fixedItems,
      subscriptionItems,
      otherItems,
      transportItems,
    } = req.body;

    if (
      !year ||
      !month ||
      !totalExpenses ||
      !totalIncome ||
      !totalSavings ||
      !fixedItems ||
      !subscriptionItems ||
      !otherItems ||
      !transportItems
    ) {
      return HttpResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    return HttpResponse.json(
      { cardId: '67b39f9c8e5bc6f868faf427' },
      { status: 201 }
    );
  }),

  http.patch('/:userId/:cardId', async ({ params, req }) => {
    await delay(400);

    const { userId, token } = req.body;

    if (!userId || !token || !params.cardId) {
      return HttpResponse.json(
        { error: 'Missing token or userId' },
        { status: 400 }
      );
    }

    if (token !== 'placeholderToken') {
      return HttpResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    if (userId !== 'placeholderId') {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (params.cardId !== placeholderCard) {
      return HttpResponse.json({ error: 'Invalid card ID' }, { status: 404 });
    }

    return HttpResponse.json(
      { message: `Card ${params.cardId} updated` },
      { status: 200 }
    );
  }),

  http.get('/:userId/:cardId', async ({ request, params }) => {
    const token = request.headers.get('Authorization');

    if (!params.userId || !token || !params.cardId) {
      return HttpResponse.json(
        { error: 'Missing token or userId' },
        { status: 400 }
      );
    }

    const bearer = token.replace('Bearer ', '');

    if (params.userId !== 'placeholderId' || token !== 'placeholderToken') {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    return HttpResponse.json(cardItem, { status: 200 });
  }),

  http.get('/:userId/cards', async ({ params }) => {
    const { token } = req.body;

    if (!params.userId || !token) {
      return HttpResponse.json(
        { error: 'Missing token or userId' },
        { status: 400 }
      );
    }

    if (params.userId !== 'placeholderId' || token !== 'placeholderToken') {
      return HttpResponse.json({ error: 'Invalid credentials' });
    }
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

  http.patch('/users/:userId/update', async ({ req, params }) => {
    await delay(400);

    const { token } = req.body;
    const { userId } = params;
    const { name } = req.body;
    const { email } = req.body;

    if (!token || !userId) {
      return HttpResponse.json(
        { error: 'Missing token or userId' },
        { status: 400 }
      );
    }

    if (token !== 'mocked-jwt-token') {
      return HttpResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    if (userId !== '76das78f87asdv87h7gf9') {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return HttpResponse.json(
      {
        user: { name: { name }, email: { email } },
        id: 'd98ds2a7w948',
      },
      { message: `User ${params.userId} updated successfully` },
      { status: 200 }
    );
  }),
];
