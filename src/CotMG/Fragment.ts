import { FragmentType } from "./FragmentType";

export const Fragments: Fragment[] = [];

export class Fragment {
    id: number;
    shape: boolean[][];
    type: FragmentType;
    limit: number;

    constructor(id: number, shape: boolean[][], type: FragmentType, limit: number) {
        this.id = id;
        this.shape = shape;
        this.type = type;
        this.limit = limit;
    }

    fullAt(x: number, y: number): boolean {
        if(y < 0) return false;
        if(y >= this.shape.length) return false;
        if(x < 0) return false;
        if(x >= this.shape[y].length) return false;
        // Yes it's ordered y first.
        return this.shape[y][x];
    }
}

export function FragmentById(id: number): Fragment | null {
    for(const fragment of Fragments) {
        if(fragment.id === id) return fragment;
    }
    return null;
}


(function() {
    const _ = false;
    const X = true;
    Fragments.push(new Fragment(
        0,
        [
            [X,X,X],
            [_,_,X],
            [_,_,X],
        ],
        FragmentType.Stat,
        1,
    ));
})();