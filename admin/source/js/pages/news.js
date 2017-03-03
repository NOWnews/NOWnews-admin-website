function diffUsingJS(column) {
    'use strict';
    var basic = '#df-' + column + '-',
        before = difflib.stringAsLines($(basic + 'before').val()),
        after = difflib.stringAsLines($(basic + 'after').val()),
        sm = new difflib.SequenceMatcher(before, after),
        opcodes = sm.get_opcodes(),
        diffoutputdiv = $(basic + 'output');

    diffoutputdiv.append(diffview.buildView({
        baseTextLines: before,
        newTextLines: after,
        opcodes: opcodes,
        baseTextName: 'before',
        newTextName: 'after',
        contextSize: null,
        viewType: 1
    }));


}

