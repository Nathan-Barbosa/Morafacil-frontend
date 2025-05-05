const Loading = () => {
    return (
      <div className="flex items-start justify-center min-h-[300px] py-16 w-full">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Spinner */}
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  
          {/* Mensagem */}
          <span className="text-blue-600 text-lg font-medium">Carregando...</span>
        </div>
      </div>
    );
  };
  
  export default Loading;