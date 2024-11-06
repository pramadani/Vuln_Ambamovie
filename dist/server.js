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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieRoute_1 = __importDefault(require("./routes/MovieRoute"));
const ReviewRoute_1 = __importDefault(require("./routes/ReviewRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const dbConnection_1 = require("./config/dbConnection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/movies', MovieRoute_1.default);
app.use('/reviews', ReviewRoute_1.default);
app.use('/users', UserRoute_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnection_1.connectDB)();
    const PORT = process.env.SERVER_PORT;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
startServer();
