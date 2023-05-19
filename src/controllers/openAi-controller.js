const axios = require("axios");
const mysql = require("../../mysql.js");

exports.getOpenAi = async (req, res, next) => {
  try {
    const texto = await req.body.texto;
    if (!texto) {
      return res.status(404).send({
        retorno: {
          status: 404,
          mensagem: "Texto não informado, tente novamente",
        },
      });
    }
    const requestOptions = await {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: texto }],
        temperature: 0.7,
        language: 'pt',
      },
      requestOptions
    );

    await mysql.execute(`insert into mensagem (descricao) values (?)`, [texto]);

    res.status(200).send({
      retorno: {
        status: 200,
        mensagem: "sucesso",
        response: response.data.choices[0].message.content,
      },
    });
  } catch (error) {
    res.status(500).send({
      retorno: {
        status: 500,
        error: error.message,
      },
    });
  }
};
