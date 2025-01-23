import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Menu from './components/MenuStudent';
import Footer from './components/Footer';
import { publicRouters } from './routes';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <main className="flex-grow flex relative">
          <aside className=" w-[30%]">
            <Menu />
          </aside>

          <div className=" flex-grow p-4 ">
            <header className=" pl-20 top-0 ">
              <Header />
            </header>
            <div className="pl-20">
              <Routes>
                {publicRouters.map((route, index) => {
                  const Page = route.Component;
                  return <Route key={index} path={route.path} element={<Page />} />;
                })}
              </Routes>
            </div>
          </div>
        </main>

        <footer className=" text-white text-center">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
