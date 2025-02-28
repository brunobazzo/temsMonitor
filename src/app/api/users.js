export default function handler(req, res) {
    if (req.method === 'GET') {
      // Retorna uma lista de usuários
      res.status(200).json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]);
    } else if (req.method === 'POST') {
      // Simula a criação de um novo usuário
      const newUser = req.body;
      res.status(201).json({ id: Date.now(), ...newUser });
    } else {
      res.status(405).json({ message: 'Método não permitido' });
    }
  }