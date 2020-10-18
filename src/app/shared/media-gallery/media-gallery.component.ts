import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.css']
})
export class MediaGalleryComponent implements OnInit {
  public show: boolean = true;
  @Input() medias: any = [];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  otherAttachments: any[] = [];
  swipperVideoAttachments: any[] = [];
  constructor() { }

  ngOnInit() {
    const medias = this.medias || [];
    this.galleryImages = MediaGalleryComponent.prepareGalleryImages(medias);
    this.galleryOptions = this.prepareGalleryOptions();
  }

  private static prepareGalleryImages(medias: any[]): NgxGalleryImage[] {
    return medias.map(media_item => ({
        small: media_item.replace(/\.heic$/, '.webp'),
        medium: media_item.replace(/\.heic$/, '.webp'),
        big: media_item.replace(/\.heic$/, '.webp'),
        url: media_item.replace(/\.heic$/, '.webp'),
        src: media_item.replace(/\.heic$/, '.webp'),
        thumb: media_item.replace(/\.heic$/, '.webp')
    }));
  }

  prepareGalleryOptions() {
    return [{
        width: '150px',
        height: '150px',
        thumbnailsColumns: 1,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsRemainingCount: true,
        image: false,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewBullets: true,
        previewInfinityMove: true,
        lazyLoading: false,
      },
      {
        breakpoint: 800,
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 0,
        thumbnailMargin: 10,
      },
      { breakpoint: 400, preview: false },
    ];
  }
}

