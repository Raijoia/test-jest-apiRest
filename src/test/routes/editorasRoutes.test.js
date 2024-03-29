import {
  beforeEach, afterEach, describe, expect, it, jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;
let idResposta;

beforeEach(() => {
  const PORT = 3000;
  server = app.listen(PORT);
});

afterEach(() => {
  server.close();
});

describe('GET /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

describe('POST /editoras', () => {
  it('Deve criar uma nova editora', async () => {
    const reposta = await request(app)
      .post('/editoras')
      .send({ nome: 'Raí', email: 'rai@rai.com', cidade: 'São Paulo' })
      .expect(201);

    idResposta = reposta.body.content.id;
  });
  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('GET /editoras/id', () => {
  it('Deve retornar o recurso selecionado', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);
  });
});

describe('PUT /editoras/id', () => {
  test.each([
    ['nome', { nome: 'Raí' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'ra@ra.com' }],
  ])('Deve alterar o campo %s', async (chave, params) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');

    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(params)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE /editoras/id', () => {
  it('Deve deletar uma editora', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
