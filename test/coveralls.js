var execSync = require("child_process").execSync;

process.env.test_coverage = true;

execSync("mocha test/specs/1_Base.js -R html-cov > test/results/coverage.html");
execSync("mocha test/specs/1_Base.js -R mocha-lcov-reporter > test/coverage/coverage-dist.lcov");

delete process.env.test_coverage;