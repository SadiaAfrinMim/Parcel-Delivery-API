import mongoose from "mongoose";
import config from "./config/config";
import app from "./app";
import { Server } from "http";

let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(config.database_url)

        console.log("Connected to DB!!");

        server = app.listen(config.port, () => {
            console.log(`Server is listening to port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

(async () => {
    await startServer()
    
})()

process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("SIGINT signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})


process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejecttion detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})
