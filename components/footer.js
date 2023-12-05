import React from "react";
import Container from "./container";

export default function Footer() {
  return (
    <Container>
      <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="mt-5">

          </div>
        </div>
      </div>
      <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
        Carrito de compras © {new Date().getFullYear()}. Todos los derechos reservados
      </div>
    </Container>
  );
}
