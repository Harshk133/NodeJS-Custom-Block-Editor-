import * as Blockly from 'blockly';

export const jsonGenerator = new Blockly.Generator('JSON');

const Order = {
    ATOMIC: 0,
};

jsonGenerator.forBlock['logic_null'] = function (block) {
    return ['null', Order.ATOMIC];
};

jsonGenerator.forBlock['text'] = function(block) {
    const textValue = block.getFieldValue('TEXT');
    const code = `"${textValue}"`;
    return [code, Order.ATOMIC];
};

jsonGenerator.scrub_ = function(block, code, thisOnly) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
      return code + ',\n' + jsonGenerator.blockToCode(nextBlock);
    }
    return code;
  };