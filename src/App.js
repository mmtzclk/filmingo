import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { movies } from "./data";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route) => (
            <React.Fragment key={route.path}>
              <Route
                path={route.path}
                element={<route.component movies={movies} />}
                exact={route.exact}
              />
            </React.Fragment>
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
