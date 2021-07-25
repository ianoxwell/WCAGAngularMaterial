import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorkeysPipe } from './error-keys.pipe';
import { FormErrorMessagePipe } from './form-error-message.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [ErrorkeysPipe, FormErrorMessagePipe],
	exports: [ErrorkeysPipe, FormErrorMessagePipe],
	providers: [ErrorkeysPipe]
})
export class ApplicationPipesModule {}
