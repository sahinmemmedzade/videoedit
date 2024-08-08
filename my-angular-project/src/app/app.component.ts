import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { VideoService } from './video.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule]
})
export class AppComponent implements OnInit, AfterViewInit {
  videos: any[] = [];
  filteredVideos: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  categories: any[] = [];  // Kateqoriyaların saxlanması üçün dəyişən

  @ViewChildren('videoElement') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getAllVideos().subscribe(
      (data: any[]) => {
        this.videos = data;
        this.filteredVideos = data;
      },
      (error: any) => {
        console.error('Error fetching videos', error);
      }
    );

    this.videoService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  ngAfterViewInit() {
    console.log('Video Elements:', this.videoElements.toArray());
  }

  onVideoClick(index: number): void {
    const videoArray = this.videoElements.toArray();
    console.log('Video Elements Array:', videoArray);

    if (index >= 0 && index < videoArray.length) {
      const currentVideo = videoArray[index].nativeElement;
      console.log('Current Video:', currentVideo);

      if (currentVideo instanceof HTMLVideoElement) {
        if (currentVideo.paused) {
          videoArray.forEach(video => {
            const videoElement = video.nativeElement;
            if (videoElement instanceof HTMLVideoElement && videoElement !== currentVideo) {
              videoElement.pause();
            }
          });
          currentVideo.play().catch(error => {
            console.error('Error playing video:', error);
          });
        } else {
          currentVideo.pause();
        }
      } else {
        console.error('The selected video element is not an HTMLVideoElement.');
      }
    } else {
      console.error('Invalid video index.');
    }
  }

  onSearch() {
    this.filteredVideos = this.videos.filter(video =>
      video.description.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedCategory ? video.categoryName === this.selectedCategory : true)
    );
  }

  onCategoryChange() {
    this.onSearch();
  }

  onMouseEnter(index: number) {
    console.log('Mouse entered on video index:', index);
    // Burada mouse enter hadisəsi ilə bağlı əlavə əməliyyatlar edə bilərsiniz
  }

  onMouseDown(index: number) {
    console.log('Mouse down on video index:', index);
    // Burada mousedown hadisəsi ilə bağlı əlavə əməliyyatlar edə bilərsiniz
  }
}
