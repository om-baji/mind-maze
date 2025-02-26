import { Context } from "hono";
import swaggerConfig from "../utils/swagger.config";

export class DocsController {
    static async getSwagger(c : Context){
        c.json(swaggerConfig)
    }
}