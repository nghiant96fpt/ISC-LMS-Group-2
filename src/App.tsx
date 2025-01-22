import React from 'react';
import './App.css'; 
import Header from './components/Header/Header'; 

function App() {
  return (
    <div className="App">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow">
        <Header />
      </header>

      {/* Nội dung chính */}
      <main className="mt-6 p-6">
        <h1 className="text-2xl font-bold">Nội dung chính của ứng dụng</h1>
        <p className="text-gray-700">Đây là nơi bạn hiển thị nội dung chính.</p>
      </main>
    </div>
  );
}

export default App;
