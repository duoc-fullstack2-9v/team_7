import "@testing-library/jest-dom";
import { it, describe, expect, beforeEach, afterEach, beforeAll, afterAll } from "vitest";

// Alias en español para Vitest
globalThis.prueba = it;
globalThis.describe = describe;
globalThis.espera = expect;
globalThis.antesDeCada = beforeEach;
globalThis.despuesDeCada = afterEach;
globalThis.antesDelTodo = beforeAll;
globalThis.despuesDelTodo = afterAll;
