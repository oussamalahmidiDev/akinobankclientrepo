import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "input[clean]",
})
export class CleanInputDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener("blur")
  onBlur() {
    this.clean();
  }

  private clean() {
    const value = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = this.elRef.nativeElement.value.replace(
      /\s/g,
      ""
    );
  }
}
