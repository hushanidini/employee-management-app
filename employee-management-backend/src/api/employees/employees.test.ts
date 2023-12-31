import request from 'supertest';

import app from '../../app';
import { Employees } from './employees.model';

beforeAll(async () => {
  try {
    await Employees.drop();
  } catch (error) { }
});

describe('GET /api/v1/employees', () => {
  it('responds with an array of employees', async () =>
    request(app)
      .get('/api/v1/employees')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});

let id = '';
describe('POST /api/v1/employees', () => {
  it('responds with an error if the employee is invalid', async () =>
    request(app)
      .post('/api/v1/employees')
      .set('Accept', 'application/json')
      .send({
        first_name: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        console.log(response.body.message);
        expect(response.body).toHaveProperty('message');
      }),
  );
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/employees')
      .set('Accept', 'application/json')
      .send({
        first_name: 'test first',
        last_name: 'last name',
        email: 'test@gmail.com',
        number: '+94771277218',
        gender: 'M',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body).toHaveProperty('first_name');
        expect(response.body.first_name).toBe('test first');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body.last_name).toBe('last name');
      }),
  );
});

describe('GET /api/v1/employees/:id', () => {
  it('responds with a single employee', async () =>

    request(app)
      .get(`/api/v1/employees/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {

        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('first_name');
        expect(response.body.first_name).toBe('test first');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body.last_name).toBe('last name');

      }),
  );
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/employees/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get('/api/v1/employees/654fd8305182bafbced5b59a1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('PUT /api/v1/employees/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/v1/employees/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/employees/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send({
        first_name: 'test first',
        last_name: 'last name',
        email: 'test@gmail.com',
        number: '+94771277218',
        gender: 'M',
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a single employee', async () =>
    request(app)
      .put(`/api/v1/employees/${id}`)
      .set('Accept', 'application/json')
      .send({
        first_name: 'test first',
        last_name: 'last name',
        email: 'test@gmail.com',
        number: '+94771277218',
        gender: 'M',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('first_name');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body.last_name).toBe('last name');
      }),
  );
});

describe('DELETE /api/v1/employees/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/employees/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/employees/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', (done) => {
    request(app)
      .delete(`/api/v1/employees/${id}`)
      .expect(204, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/employees/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});