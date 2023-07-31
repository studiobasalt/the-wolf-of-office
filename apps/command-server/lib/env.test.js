import { describe, it, expect } from "vitest";
import env from "./lib/load-env"


describe("All env variables are set", () => {
    it("Env loader is defined", () => {
        expect(env).toBeDefined();
    })
    it("Env variables are defined", () => {
        expect(env.DEVICE_NAME).toBeDefined();
        expect(env.SCREEN_ORIENTATION).toBeDefined();
        expect(env.SLACK_APP_TOKEN).toBeDefined();
        expect(env.SLACK_BOT_TOKEN).toBeDefined();
    })
})