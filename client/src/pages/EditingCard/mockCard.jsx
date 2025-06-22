const mockCard = {
  cardId: 'dasds',
  year: 2024,
  month: 2,
  totalExpenses: 1200,
  totalIncome: 1600,
  totalSavings: 400,

  fixedItems: {
    name: 'The Non-Negotiables',
    items: [
      {
        description: 'rent+bills+food',
        price: 605,
        date: new Date('2025-02-01'),
      },
    ]
  },
  subscriptionItems: {
    name: 'On Repeat',
    items: [
      {
        description: 'HBO',
        price: 4.99,
        date: new Date('2025-02-01'),
      },
      {
        description: 'Amazon no ads',
        price: 1.99,
        date: new Date('2025-02-01'),
      },
      {
        description: 'HBO',
        price: 4.99,
        date: new Date('2025-02-01'),
      }

    ]
  },
  otherItems: {
    name: 'Little Life Things',
    items: [
      {
        description: 'print label + adhesive',
        price: 2.56,
        category: '67a91f012213777227c723ca',
        date: new Date('2025-02-01'),
      }, {
        description: 'print label + adhesive',
        price: 2.56,
        category: '67a91f012213777227c723ca',
        date: new Date('2025-02-01'),
      },
      {
        description: 'Decathlon',
        price: 76,
        category: '67a91f012213777227c723cb',
        date: new Date('2025-02-01'),
      }

    ]
  },
  transportItems: {
    name: 'Out & About',
    items: [
      {
        description: 'cabify',
        price: 6.98,
        category: '67a91f012213777227c723cb',

        date: new Date('2025-02-01'),
      },
    ]
  },

  foodItems: {
    name: 'Bits & Bites',
    items: [
      {
        description: 'cinnamon oreo',
        price: 4.99,
        category: '67a91f012213777227c723cb',

        date: new Date(),
      },
    ]
  },

  fixedExpenses: 9,
  subscriptionExpenses: 9,
  otherExpenses: 9,
  transportExpenses: 9,
  foodExpenses: 4.99,
};

export default mockCard