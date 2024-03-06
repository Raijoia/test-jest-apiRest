import { describe, expect } from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);
    expect(editora).toMatchObject(
      expect.objectContaining(objetoEditora),
    );
  });

  it('Deve salvar editora no banco de dados', async () => {
    const editora = new Editora(objetoEditora);
    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
