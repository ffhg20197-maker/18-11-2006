import test from "node:test";
import assert from "node:assert/strict";
import { isSupportedNodeVersion, summarizePipeline } from "../app.js";

test("pipeline summary counts completed phases", () => {
  assert.deepEqual(summarizePipeline([
    { completed: true }, { completed: true }, { completed: false }, { completed: true }
  ]), { completed: 3, total: 4, percentage: 75 });
});

test("empty pipeline has zero progress", () => {
  assert.deepEqual(summarizePipeline([]), { completed: 0, total: 0, percentage: 0 });
});

test("matrix accepts only the required Node.js versions", () => {
  assert.equal(isSupportedNodeVersion(18), true);
  assert.equal(isSupportedNodeVersion(20), true);
  assert.equal(isSupportedNodeVersion(22), true);
  assert.equal(isSupportedNodeVersion(21), false);
});
