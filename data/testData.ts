export const testData = {
    user: {
        name: 'TestUser',
        title: 'Mr',
        email: `test${Date.now()}@example.com`, // Dynamic email to avoid duplicate error
        password: 'password123',
        day: '10',
        month: 'April',
        year: '2000',
        firstName: 'Test',
        lastName: 'User',
        address: '123 Fake St',
        country: 'United States',
        state: 'Texas',
        city: 'Austin',
        zipCode: '78701',
        mobileNumber: '1234567890'
    }
};

export const existingUser = {
    email: 'valid_email@example.com', // Should be replaced with a registered user if needed
    password: 'password123'
};
