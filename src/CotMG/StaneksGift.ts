import { Fragment, FragmentById } from "./Fragment";
import { ActiveFragment } from "./ActiveFragment";

export class StaneksGift {
    fragments: ActiveFragment[] = [];

    canPlace(x: number, y: number, fragment: Fragment): boolean {
        const newFrag = new ActiveFragment(x, y, fragment);
        for(const aFrag of this.fragments) {
            if(aFrag.collide(newFrag)) return false;
        }
        return true;
    }

    place(x: number, y: number, fragment: Fragment): boolean {
        if(!this.canPlace(x, y, fragment)) return false;
        this.fragments.push(new ActiveFragment(x, y, fragment));
        return true;
    }

    fragmentAt(worldX: number, worldY: number): ActiveFragment | null {
        for(const aFrag of this.fragments) {
            if(aFrag.fullAt(worldX, worldY)) {
                return aFrag;
            }
        }

        return null;
    }
}