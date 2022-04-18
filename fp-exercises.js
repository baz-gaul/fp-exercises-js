// form list from args
const clist = function(...args){
    // {any} => List[any]
    return [...args];
}

// subtract all args from first arg
const sub = function(...args){
    // {numbers} => {number}
    if(args.length === 0) return 0;
    return args.slice(1).reduce((a,b) => a - b, args[0]);
}

// add all args
const add = function(...args){
    // {numbers} => {number}
    return args.reduce((a,b) => a + b, 0);
}

// double single arg
const double = function(x){
    // {numbers} => list[numbers]
    return x * 2;
}

// negate single arg
const negate = function(x){
    // {numbers} => list[numbers]
    return x * -1;
}

// compose a variable number of functions and arguments
const composeVarArgs = function(...funcs){
    return function(...vals){
        return funcs.reduceRight((a, b) => {
            return b(...a);
        }, vals);
    }
}

// zip arrays together zip([2,3], [4,5]) => [[2,4], [3,5]]
const zip = function(...seqs){
    return seqs[0].map((_, i) => {
        return seqs.map(x => x[i]);
    });
}

// zip arrays into map, zipMap(["a", "b"], [4, 5]) => {"a": 4, "b": 5}
const zipMap = function(seq1, seq2){
    return new Map(zip(seq1, seq2));
}

// take a function f and arbitrary number of sequences
// return a list of f applied to the first elements of the given sequences
// followed by f applied to the second elements of the sequences, and so on
// zipWith(add, [1, 2, 3], [4, 5, 6]) => [5,7,9]
const zipWith = function(f, ...seqs){
    return zip(...seqs).map(x => f(...x));
}

// might be wrong
const partial = function(f, ...args){
    return function(...otherArgs){
        return  f(...args, ...otherArgs);
    };
}

// go back to cdr cons car
function transpose(matrix) {
    return matrix.reduce((accum, curr) => curr.map((_, i) =>
        (accum[i] || []).concat(curr[i])
    ), []);
}

// flip arguments to a function f
// flips(zip)([4,5], [1,2]) => [[1, 4], [2, 1]]
const flips = (f) => {
    return function(...vals){
        return f(
            ...vals.reduce((a, b) => [b].concat(a))
            );
    }
}

// sort of cheating, but we have no tail call optimization
const take = (n, seq) => {
    return seq.slice(0, n);
}

// sort of cheating, but we have no tail call optimization
const drop = (n, seq) => {
    return seq.slice(0, n);
}

// interleave([1, 2, 3], [10, 20, 30]) => [1,10,2,20,3,30]
const interleave = function(...seqs){
    return zip(...seqs).flat(1);
}

const positive = (x) => x >= 0;
const even = (x) => x % 2 == 0;

// take a series of boolean returning functions
// return a function which tests whether all of them are true for val
// everyPred(even, positive)(4) => true
const everyPred = function(...fs){
    return function(val){
        return fs.every(f => f(val));
    }
}

// form a frequency map for the values in the sequence
const frequencies = (seq) => {
    seq.reduce((a, b) => {
        return a.has(b) ? a.set(b, a.get(b) + 1) : a.set(b, 1);
    },new Map())
}

// return a memoized version of the function
const memoize = (f) => {
    const memoMap = new Map();
    return function(...vals){
        const strVals = JSON.stringify(vals);
        if(memoMap.has(strVals)) return memoMap.get(strVals);
        const res = f(...vals);
        const strRes = JSON.stringify(res);
        memoMap.set(strVals, strRes);
        return res;
    }
}

// would be betterw ith immutable hash map
const groupBy = function(f, ...seqs){
    seqs.reduce((a, b) => {
        const res = f(b);
        if(a.has(res)){
            a.get(res).push(b);
            return a;
        }
        return a.set(res, [b]);
    }, new Map());
}

// reverse of compose
// return a function that applies all the functions given sequentially left to right on the value
const pipe = (...fns) => {
    return (x) => {
        return fns.reduce((a,b) => b(a), x);
    }
}

// Create a function partition that takes the arguments n, step, and seq (number, number, seqence)
// It should take n elements from seq, wrap that in a list, and step forward in seq step steps, 
// then take another n elements, and so on
const partition = (n, step, seq) => {

}