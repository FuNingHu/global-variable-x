/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    ProgramBehaviorAPI,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    ValidationContext,
    ValidationResponse,
    VariableDeclaration
} from '@universal-robots/contribution-api';
import { GlobalVariableXProgramNode } from './global-variable-x-program.node';
import { async } from 'rxjs';

// programNodeLabel is required
const createProgramNodeLabel = (node: GlobalVariableXProgramNode): OptionalPromise<string> => {
    return node.parameters.variable.name;
};

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: GlobalVariableXProgramNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    builder.globalVariable(node.parameters.variable.name, 'False');
    return builder;
};

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: GlobalVariableXProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: GlobalVariableXProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: GlobalVariableXProgramNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
    isValid: true
});

// allowsChild is optional
const allowChildInsert = (node: ProgramNode, childType: string): OptionalPromise<boolean> => true;

// allowedInContext is optional
const allowedInsert = (insertionContext: InsertionContext): OptionalPromise<boolean> => true;

// upgradeNode is optional
const nodeUpgrade = (loadedNode: ProgramNode): ProgramNode => loadedNode;

async function createVariable(suggestedName: string): Promise<VariableDeclaration>{
    const variableDeclaration = new ProgramBehaviorAPI(self).variableService.createVariable(suggestedName, 'boolean');
    return variableDeclaration;
};
const behaviors: ProgramBehaviors = {
    programNodeLabel: createProgramNodeLabel,
    // factory: createProgramNode,
    factory: async(): Promise<GlobalVariableXProgramNode> => {
        const counterName = createVariable('myVar');
        return {
            type: 'funh-global-variable-x-global-variable-x-program',
            version: '1.0.0',
            lockChildren: false,
            allowsChildren: false,
            parameters:{
                variable: await counterName,
            },
        };
    },
    generateCodeBeforeChildren: generateScriptCodeBefore,
    generateCodeAfterChildren: generateScriptCodeAfter,
    generateCodePreamble: generatePreambleScriptCode,
    validator: validate,
    allowsChild: allowChildInsert,
    allowedInContext: allowedInsert,
    upgradeNode: nodeUpgrade
};

registerProgramBehavior(behaviors);
