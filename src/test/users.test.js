const { graphql } = require('graphql');
const { schema } = require('./../index');

const setupTest = require('./helpers');

const mutationRegister = `
    mutation Register($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
        signup (data: {
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            password: $password
        }) {
            token
        }
    }
`;

describe('Registro de usuario functiona correctamente', () => {
    beforeEach(async () => await setupTest());

    it ('Deberia registrar un usuario correctamente', async () => {
        const first_name = 'Prueba';
        const last_name = 'Probada';
        const email = 'prueba@probada.com';
        const password = 'Fierro';

        const res = await graphql(schema, mutationRegister, null, {}, {
            first_name, last_name, email, password
        });

        expect(res).toMatchSnapshot();
        expect(res).toHaveProperty('data');
    })
})
