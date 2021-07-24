import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorkeysPipe } from './error-keys.pipe';
import { FormErrorCountPipe } from './form-error-count.pipe';
import { FormErrorMessagePipe } from './form-error-message.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [ErrorkeysPipe, FormErrorCountPipe, FormErrorMessagePipe],
	exports: [ErrorkeysPipe, FormErrorCountPipe, FormErrorMessagePipe],
	providers: [ErrorkeysPipe]
})
export class ApplicationPipesModule {}
