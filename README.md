# SO-101: Learning to Pick and Place on a Mac

A personal robotics project by [Carina Ma](https://www.linkedin.com/in/sixuan-m-1317171b0/).

## Project

SO-101 leader–follower setup, two camera views, demonstration collection, and real-hardware evaluation of ACT and SmolVLA on an Apple M3 Pro.

- 100 demonstrations; 80 / 10 / 10 train–validation–test split
- ACT task completion: 7/10 (6 autonomous + 1 assisted)
- SmolVLA task completion: 2/10
- Six paired front/wrist demonstrations with synchronized playback
- ACT architecture and SmolVLA policy diagrams

These results describe the recorded sessions shown on the project page.

## Local preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Publish with GitHub Pages

The included workflow deploys on pushes to `main`. Set **Settings → Pages → Source** to **GitHub Actions**.

## References

1. Zhao et al. [Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](https://arxiv.org/abs/2304.13705), 2023.
2. Shukor et al. [SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics](https://arxiv.org/abs/2506.01844), 2025.

The repository contains the presentation website and selected demonstration media. Robot-control code, model weights, and the training dataset are not included.
