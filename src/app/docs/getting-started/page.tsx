import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components";
import { codeSnippetStringsData, constantsData, gettingStartedStringsData } from "@/data";
import { CodeLanguageEnum } from "@/enums";

export const metadata: Metadata = { title: gettingStartedStringsData.metadataTitle };

const allRulesConfig = `import codeStyle from "eslint-plugin-code-style";

export default [
    {
        plugins: {
            "code-style": codeStyle,
        },
        rules: {
            "code-style/array-callback-destructure": "error",
            "code-style/array-items-per-line": "error",
            "code-style/array-objects-on-new-lines": "error",
            "code-style/arrow-function-block-body": "error",
            "code-style/arrow-function-simple-jsx": "error",
            "code-style/arrow-function-simplify": "error",
            "code-style/curried-arrow-same-line": "error",
            "code-style/function-arguments-format": "error",
            "code-style/nested-call-closing-brackets": "error",
            "code-style/no-empty-lines-in-arrays": "error",
            "code-style/no-empty-lines-in-function-calls": "error",
            "code-style/opening-brackets-same-line": "error",
            "code-style/simple-call-single-line": "error",
            "code-style/single-argument-on-one-line": "error",
            "code-style/comment-format": "error",
            "code-style/component-props-destructure": "error",
            "code-style/component-props-inline-type": "error",
            "code-style/folder-based-naming-convention": "error",
            "code-style/folder-structure-consistency": "error",
            "code-style/no-redundant-folder-suffix": "error",
            "code-style/svg-icon-naming-convention": "error",
            "code-style/class-method-definition-format": "error",
            "code-style/class-naming-convention": "error",
            "code-style/block-statement-newlines": "error",
            "code-style/empty-line-after-block": "error",
            "code-style/if-else-spacing": "error",
            "code-style/if-statement-format": "error",
            "code-style/logical-expression-multiline": "error",
            "code-style/multiline-if-conditions": "error",
            "code-style/no-empty-lines-in-switch-cases": "error",
            "code-style/ternary-condition-multiline": "error",
            "code-style/function-call-spacing": "error",
            "code-style/function-declaration-style": "error",
            "code-style/function-naming-convention": "error",
            "code-style/function-object-destructure": "error",
            "code-style/function-params-per-line": "error",
            "code-style/no-empty-lines-in-function-params": "error",
            "code-style/hook-callback-format": "error",
            "code-style/hook-deps-per-line": "error",
            "code-style/hook-file-naming-convention": "error",
            "code-style/hook-function-naming-convention": "error",
            "code-style/use-state-naming-convention": "error",
            "code-style/absolute-imports-only": "error",
            "code-style/export-format": "error",
            "code-style/import-format": "error",
            "code-style/import-source-spacing": "error",
            "code-style/index-export-style": "error",
            "code-style/index-exports-only": "error",
            "code-style/inline-export-declaration": "error",
            "code-style/module-index-exports": "error",
            "code-style/classname-dynamic-at-end": "error",
            "code-style/classname-multiline": "error",
            "code-style/classname-no-extra-spaces": "error",
            "code-style/classname-order": "error",
            "code-style/jsx-children-on-new-line": "error",
            "code-style/jsx-closing-bracket-spacing": "error",
            "code-style/jsx-element-child-new-line": "error",
            "code-style/jsx-logical-expression-simplify": "error",
            "code-style/jsx-parentheses-position": "error",
            "code-style/jsx-prop-naming-convention": "error",
            "code-style/jsx-simple-element-one-line": "error",
            "code-style/jsx-string-value-trim": "error",
            "code-style/jsx-ternary-format": "error",
            "code-style/no-empty-lines-in-jsx": "error",
            "code-style/no-empty-lines-in-objects": "error",
            "code-style/object-property-per-line": "error",
            "code-style/object-property-value-brace": "error",
            "code-style/object-property-value-format": "error",
            "code-style/string-property-spacing": "error",
            "code-style/assignment-value-same-line": "error",
            "code-style/member-expression-bracket-spacing": "error",
            "code-style/react-code-order": "error",
            "code-style/no-hardcoded-strings": "error",
            "code-style/enum-format": "error",
            "code-style/enum-type-enforcement": "error",
            "code-style/interface-format": "error",
            "code-style/no-inline-type-definitions": "error",
            "code-style/prop-naming-convention": "error",
            "code-style/type-annotation-spacing": "error",
            "code-style/type-format": "error",
            "code-style/typescript-definition-location": "error",
            "code-style/variable-naming-convention": "error",
        },
    },
];`;

const basicConfig = `import codeStyle from "eslint-plugin-code-style";

export default [
    codeStyle.configs.react,
];`;

const disableRulesConfig = `import codeStyle from "eslint-plugin-code-style";

export default [
    codeStyle.configs.react,
    {
        rules: {
            "code-style/array-items-per-line": "off",
            "code-style/comment-format": "off",
        },
    },
];`;

const GettingStartedPage = () => (
    <div>
        <h1>{gettingStartedStringsData.title}</h1>
        <p>
            {gettingStartedStringsData.introPrefix}
            <strong>{gettingStartedStringsData.pluginName}</strong>
            {gettingStartedStringsData.intro}
        </p>
        <h2 id="requirements">{gettingStartedStringsData.sectionRequirements}</h2>
        <table>
            <thead>
                <tr>
                    <th>{gettingStartedStringsData.tableHeaderDependency}</th>
                    <th>{gettingStartedStringsData.tableHeaderVersion}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>{gettingStartedStringsData.requirementEslint}</strong>
                    </td>
                    <td>{gettingStartedStringsData.requirementEslintVersion}</td>
                </tr>
                <tr>
                    <td>
                        <strong>{gettingStartedStringsData.requirementNode}</strong>
                    </td>
                    <td>{gettingStartedStringsData.requirementNodeVersion}</td>
                </tr>
            </tbody>
        </table>
        <h2 id="installation">{gettingStartedStringsData.sectionInstallation}</h2>
        <p>{gettingStartedStringsData.installationDescription}</p>
        <div className="space-y-4">
            <CodeBlock
                code={codeSnippetStringsData.installNpm}
                filename={constantsData.codeFileNames.npm}
                language={CodeLanguageEnum.BASH}
            />
            <CodeBlock
                code={codeSnippetStringsData.installPnpm}
                filename={constantsData.codeFileNames.pnpm}
                language={CodeLanguageEnum.BASH}
            />
            <CodeBlock
                code={codeSnippetStringsData.installYarn}
                filename={constantsData.codeFileNames.yarn}
                language={CodeLanguageEnum.BASH}
            />
        </div>
        <h2 id="basic-configuration">{gettingStartedStringsData.sectionBasicConfiguration}</h2>
        <p>
            {gettingStartedStringsData.basicConfigDescription}
            <code>{gettingStartedStringsData.basicConfigDescriptionCode}</code>
            {gettingStartedStringsData.basicConfigDescriptionSuffix}
        </p>
        <CodeBlock
            code={basicConfig}
            filename={constantsData.codeFileNames.eslintConfig}
            language={CodeLanguageEnum.JS}
        />
        <p>
            {gettingStartedStringsData.basicConfigLinkPrefix}
            <Link href="/docs/configuration">{gettingStartedStringsData.basicConfigLinkText}</Link>
            {gettingStartedStringsData.basicConfigLinkSuffix}
        </p>
        <h2 id="run-eslint">{gettingStartedStringsData.sectionRunEslint}</h2>
        <p>
            {gettingStartedStringsData.runEslintDescription}
            <code>{gettingStartedStringsData.runEslintDescriptionCode}</code>
            {gettingStartedStringsData.runEslintDescriptionSuffix}
        </p>
        <CodeBlock
            code={codeSnippetStringsData.eslintFixCommand}
            filename={constantsData.codeFileNames.terminal}
            language={CodeLanguageEnum.BASH}
        />
        <h2 id="all-rules">{gettingStartedStringsData.sectionEnableAllRules}</h2>
        <p>{gettingStartedStringsData.enableAllRulesDescription}</p>
        <CodeBlock
            code={allRulesConfig}
            filename={constantsData.codeFileNames.eslintConfig}
            language={CodeLanguageEnum.JS}
            isShowLineNumbers
        />
        <blockquote>
            <p>
                <strong>{gettingStartedStringsData.allRulesNote}</strong>
                {" "}
                {gettingStartedStringsData.allRulesNoteText}
                <code>enum-format</code>
                {" "}
                {gettingStartedStringsData.allRulesNoteTextContinued}
                {" "}
                <code>variable-naming-convention</code>
                {" "}
                {gettingStartedStringsData.allRulesNoteTextEnd}
                <code>{gettingStartedStringsData.allRulesNoteTextParser}</code>
                {" "}
                {gettingStartedStringsData.allRulesNoteTextFinal}
            </p>
        </blockquote>
        <h2 id="disabling-rules">{gettingStartedStringsData.sectionDisablingRules}</h2>
        <p>
            {gettingStartedStringsData.disablingRulesDescription}
            <code>{gettingStartedStringsData.disablingRulesDescriptionCode}</code>
            {gettingStartedStringsData.disablingRulesDescriptionSuffix}
        </p>
        <CodeBlock
            code={disableRulesConfig}
            filename={constantsData.codeFileNames.eslintConfig}
            language={CodeLanguageEnum.JS}
        />
        <h2 id="next-steps">{gettingStartedStringsData.sectionNextSteps}</h2>
        <ul>
            <li>
                <Link href="/docs/configuration">{gettingStartedStringsData.nextStepsConfiguration}</Link>
                {gettingStartedStringsData.nextStepsConfigurationSuffix}
            </li>
            <li>
                <Link href="/docs/rules">{gettingStartedStringsData.nextStepsRulesReference}</Link>
                {gettingStartedStringsData.nextStepsRulesReferenceSuffix}
            </li>
            <li>
                <Link href="/docs/philosophy">{gettingStartedStringsData.nextStepsPhilosophy}</Link>
                {gettingStartedStringsData.nextStepsPhilosophySuffix}
            </li>
        </ul>
    </div>
);

export default GettingStartedPage;
