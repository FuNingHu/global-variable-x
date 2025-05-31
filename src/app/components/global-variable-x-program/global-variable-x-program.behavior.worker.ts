/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    ProgramBehaviorAPI,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    TabInputModel,
    URVariable,
    ValidationContext,
    ValidationResponse,
    VariableValueType
} from '@universal-robots/contribution-api';
import { GlobalVariableXProgramNode } from './global-variable-x-program.node';

// programNodeLabel is required
const createProgramNodeLabel = (node: GlobalVariableXProgramNode): OptionalPromise<string> => {
    return node.parameters?.variable.name;
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

async function createVariable(suggestedName: string): Promise<URVariable>{
    const symbolService = new ProgramBehaviorAPI(self).symbolService;
    const variable = await symbolService.generateVariable(suggestedName, VariableValueType.WAYPOINT);
    return variable;
};
const behaviors: ProgramBehaviors = {
    programNodeLabel: createProgramNodeLabel,
    // factory: createProgramNode,
    factory: async(): Promise<GlobalVariableXProgramNode> => {
        const symbolService = new ProgramBehaviorAPI(self).symbolService;
        const counterName = await symbolService.generateVariable('var', VariableValueType.BOOLEAN);
        return {
            type: 'funh-global-variable-x-global-variable-x-program',
            version: '1.0.0',
            lockChildren: false,
            allowsChildren: false,
            parameters:{
                variable: counterName,
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
