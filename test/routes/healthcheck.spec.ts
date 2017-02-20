import * as chai from "chai";
import * as request from 'supertest';
import { server as api } from '../../src/server';

const expect = chai.expect;

describe('Healthcheck', () => {
  describe("GET /healthcheck", () => {
    it("Should respond with a HTTP 200 OK", (done) => {
      request(api)
        .get('/healthcheck')
        .expect(200, done);
    });
  });
});