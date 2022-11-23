import { IDesktopCdnUpdate } from "../../interfaces/i-desktop-cdn-update";
import { BaseCdnDecorator } from "../abstracts/base-cdn-decorator";

export class GithubCdn
    extends BaseCdnDecorator
    implements IDesktopCdnUpdate {
    private _CDN_HOST: string = 'https://github.com'
    constructor(update: IDesktopCdnUpdate) {
        super(update);
        this.url = this.tagName ? `${this._CDN_HOST}/${this.config.owner}/${this.config.repository}/${this.config.typeRelease}/download/${this.tagName}` : null;
    }
}
