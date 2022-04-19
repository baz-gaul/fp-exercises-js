// form list from args
const clist = (...args) => args;

// subtract all args from first arg
const sub_many = function(...nums){
    // {numbers} => {number}
    if(nums.length === 0) return 0;
    return nums.slice(1).reduce((a,b) => a - b, args[0]);
}

// add all args
const add = (...nums) => nums.reduce((a, b) => a + b, 0);

// double single arg
const double = x => x * 2;

// negate single arg
const negate = x => x * -1;

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
const zipMap = (seq1, seq2) => new Map(zip(seq1, seq2));

// take a function f and arbitrary number of sequences
// return a list of f applied to the first elements of the given sequences
// followed by f applied to the second elements of the sequences, and so on
// zipWith(add, [1, 2, 3], [4, 5, 6]) => [5,7,9]
const zipWith = (f, ...seqs) => zip(...seqs).map(x => f(...x));


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
const take = (n, seq) => seq.slice(0, n);

// sort of cheating, but we have no tail call optimization
const drop = (n, seq) => seq.slice(n);

// interleave([1, 2, 3], [10, 20, 30]) => [1,10,2,20,3,30]
const interleave = (...seqs) => zip(...seqs).flat(1);

const positive = (x) => x >= 0;
const even = (x) => x % 2 == 0;

// take a series of boolean returning functions
// return a function which tests whether all of them are true for val
// everyPred(even, positive)(4) => true
const everyPred = (...fs) => val => fs.every(f => f(val));

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

// return a function that applies all the functions given sequentially left to right on the value
const pipe = (...fns) => x => fns.reduce((a,b) => b(a), x);

const mergeWith = (f, ...hashmaps) => {
    const pairs = hashmaps.flatMap(x => [...x]);

    return pairs.reduce((pre, curr) => {
        const key = curr[0];
        const val = curr[1];
        return pre.has(key) ? pre.set(key, f(pre.get(key), val)) :
                              pre.set(key, val);
    }, new Map());
}