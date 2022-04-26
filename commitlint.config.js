
const TYPES =  ["build", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]

module.exports = {
    extends: ["@commitlint/config-conventional"],
    plugins: ["commitlint-plugin-function-rules"],
    rules: {
        "type-enum": [2, "always", TYPES],
        "function-rules/type-min-length": [
            2,
            "always",
            (parsed) => {
                if (parsed?.type?.length < 2) {
                    return [false, "type must be bigger then 2 characters"];
                }
                return [true];
            }
        ],
        "function-rules/type-max-length": [
            2,
            "always",
            (parsed) => {
                if (parsed?.type?.length > 8) {
                    return [false, "type must not be longer then 8 characters"];
                }
                return [true];
            }
        ],
        "function-rules/subject-max-length": [
            2,
            "always",
            (parsed) => {
                console.log(parsed);
                if (parsed?.subject?.length > 80) {
                    return [false, "description must not be longer then 80 characters"];
                }
                return [true];
            }
        ],
        "subject-case": [2, "always", "sentence-case"],
        "function-rules/subject-case": [
            2,
            "always",
            (parsed) => {
                if (!/^[A-Z][a-z,0-9 ]+/.test(parsed?.subject)) {
                    return [false, "description must start from uppercase letter and other letters should be lowercase"];
                }
                return [true];
            }
        ],
        "scope-case": [2, "always", "kebab-case"],
        "function-rules/scope-case": [
            2,
            "always",
            (parsed) => {
                if (/^[0-9]-[0-9]+/.test(parsed?.scope)) {
                    return [false, "scope must not figure this pattern [1-1], [20-1] e.g."];
                } else if (!/^(?!.{20,})(\w+\-+\w+?|\w+)$/.test(parsed?.scope)) {
                    return [false, "scope must figure this pattern [task-number] or [task]"];
                }
                return [true];
            }
        ],
    }
}


