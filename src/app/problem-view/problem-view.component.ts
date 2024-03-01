import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface DataItem {
    date: string,
    description: string,
    filename: string,
    level: string,
    name: string,
    notes: string,
    status: string,
    type: string,
    url: string
  }

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrl: './problem-view.component.scss'
})
export class ProblemViewComponent {
    
    name: string | null | undefined;
    item: DataItem | undefined;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.name = this.route.snapshot.paramMap.get('name');
        if(this.name) {
            const list = (this.route.snapshot.data['apiResponse']['problems'] as DataItem[]).filter(e => e.name === this.name);
            this.item = list[0];
        }
    }

  code = `
package KunalHomework;

public class Patterns {

    static void pattern1(int n) {
        for(int r = 1; r <= n; r++) {
            for(int c = 1; c <= n; c++) {
                System.out.print("*");
            }
            System.out.println();
        }
        System.out.println();
    }

    static void pattern2(int n) {
        for(int r = 1; r <= n; r++) {
            for(int c = 1; c <= r; c++) {
                System.out.print("*");
            }
            System.out.println();
        }
        System.out.println();
    }

    static void pattern3(int n) {
        for(int r = 1; r <= n; r++) {
            for(int c = n-r+1; c >=1; c--) {
                System.out.print("*");
            }
            System.out.println();
        }
        System.out.println();
    }


    static void pattern4(int n) {
        for(int r = 1; r <= n; r++) {
            for(int c = 1; c <=r; c++) {
                System.out.print(c+" ");
            }
            System.out.println();
        }
        System.out.println();
    }


    static void pattern5(int n) {
        for (int r = 1; r <= n; r++) {
            for (int c = 1; c <= r; c++) {
                System.out.print('*');
            }
            System.out.println();
        }
        for (int r = n - 1; r >= 1; r--) {
            for (int c = 1; c <= r; c++) {
                System.out.print('*');
            }
            System.out.println();
        }
        System.out.println();
    }

    static void pattern6(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= i; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
        System.out.println();
    }

    static void pattern7(int n) {
        for (int i = 1; i <= n; i++) {
            for (int k = 1; k < i; k++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= n-i+1; j++) {
                System.out.print("*");
            }

            System.out.println();
        }
        System.out.println();
    }

    static void pattern8(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }

    public static void main(String args[]) {
        pattern1(5);
        pattern2(5);
        pattern3(5);
        pattern4(5);
        pattern5(5);
        pattern6(5);
        pattern7(5);
        pattern8(5);
    }
}
`
}
