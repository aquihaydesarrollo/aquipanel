"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var client = new pg_1.Client({
    host: 'hostybee.com',
    port: 53998, // Cambiado a 53998
    user: 'postgres',
    password: 'postgres',
    database: 'aquipanel'
});
function initDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1, createTableQuery, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, 10, 12]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, client.query('CREATE DATABASE aquipanel')];
                case 3:
                    _a.sent();
                    console.log('Base de datos creada exitosamente.');
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log('La base de datos ya existe o no se pudo crear:', error_1.message);
                    return [3 /*break*/, 5];
                case 5: 
                // Cambiar a la nueva base de datos
                return [4 /*yield*/, client.end()];
                case 6:
                    // Cambiar a la nueva base de datos
                    _a.sent();
                    client = new pg_1.Client({
                        host: 'hostybee.com',
                        port: 53998,
                        user: 'postgres',
                        password: 'postgres',
                        database: 'aquipanel'
                    });
                    return [4 /*yield*/, client.connect()];
                case 7:
                    _a.sent();
                    createTableQuery = `
                        CREATE TABLE IF NOT EXISTS clients (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255),
                            phone VARCHAR(20),
                            nif VARCHAR(20),
                            email VARCHAR(255),
                            address VARCHAR(255),
                            postalCode VARCHAR(20),
                            municipality VARCHAR(100),
                            socialReason VARCHAR(255),
                            employees INT,
                            website VARCHAR(255),
                            isActive BOOLEAN,
                            role VARCHAR(100),
                            cif VARCHAR(20),
                            numEmpleados INT,
                            direccion VARCHAR(255),
                            telefono VARCHAR(20),
                            sector VARCHAR(100),
                            fecha_fundacion DATE
                        );
                    `;
                    return [4 /*yield*/, client.query(createTableQuery)];
                case 8:
                    _a.sent();
                    console.log('Tabla creada exitosamente.');
                    return [3 /*break*/, 12];
                case 9:
                    error_2 = _a.sent();
                    console.error('Error al inicializar la base de datos:', error_2);
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, client.end()];
                case 11:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
initDatabase();
