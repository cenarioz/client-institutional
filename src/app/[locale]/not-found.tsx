const NotFoundPage = () => { 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <h1 className="text-5xl font-bold text-white mb-8">Oops!</h1>
      <p className="text-2xl text-white mb-4">
        A página que você está procurando não existe.
      </p>
      <a
        className="bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-2 px-4 rounded transition duration-300"
        href="/"
        key={404}
      >
        Voltar para a página inicial
      </a>
    </div>
  );
};

export default NotFoundPage;
